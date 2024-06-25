import { reactive } from 'vue'
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const perPage = parseInt((query.perPage as string) || '5', 10)
    const page = parseInt((query.page as string) || '1', 10)
    const filter = (query.filter as string) || ''
    const token = (query.token as string) || ''

    const result = reactive({
        total: { count: 0 },
        data: [{}]
    })

    if (perPage >= 50) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const param=reactive({token:token})
    const account: any =  await getData(param)
    result.total.count=account.data.original.total
    result.data=account.data.original.data
    return {
        total: result.total.count,
        data: filterData(result.data, filter, page, perPage),
    }

})

function filterData(
    data: any[],
    filter: string,
    page: number,
    perPage: number,
) {
    const offset = (page - 1) * perPage
    if (!filter) {
        return  data?.slice(offset, offset + perPage)
    }
    const filterRe = new RegExp(filter, 'i')
    return data?.
    filter((item:any) => {
        return [item.name].some((item) => item.match(filterRe))
    })
        .slice(offset, offset + perPage)
}

async function getData(param:any) {
    const config = useRuntimeConfig();
    const baseURL = config.public.coreApi;
    const endpoint = baseURL + '/purchase/recurring-bill/list';
    const payload = {
        token: param.token,
        option: "all",
        offset: "0",
        limit: "0"

    }

    return await $fetch(endpoint, {
        method: 'POST',
        body: payload
    }).catch((error) =>{console.log(error.data)} )
}
