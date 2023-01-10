import { CreationOptional, FindOptions, InferAttributes, Model, ModelStatic } from 'sequelize';

type DataObj<M> = M & { id: CreationOptional<number> };

async function getHierarchy<MS extends ModelStatic<Model>, M extends InstanceType<MS>>(
    model: MS,
    query: FindOptions<InferAttributes<M>>,
    childKey: keyof InferAttributes<M>,
    includeAs: keyof InferAttributes<M>,
    dataObj: DataObj<M> | null = null
) {
    const { where: queryWhere, ...restQueryOptions } = query;
    const results = await model.findAll({
        where: {
            [childKey]: dataObj === null ? null : dataObj.id,
            ...queryWhere,
        },
        ...restQueryOptions,
        include: [
            {
                model,
                as: includeAs as string,
            },
        ],
    });

    await Promise.all(
        results.map(async (result) => {
            const data = (result as DataObj<M>)[includeAs] as DataObj<M>[];

            if (data && data.length > 0) {
                await Promise.all(
                    data.map(async (dataObj) => {
                        dataObj.setDataValue(includeAs, await getHierarchy(model, query, childKey, includeAs, dataObj));
                    })
                );
            }
        })
    );

    return results;
}

export default getHierarchy;
