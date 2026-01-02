import AxiosClient from "../../config/AxiosClient";

class ChartService {
  static async getCharts(page, pageSize = 10,filterModel,sortModel,options = {}) {
    let search = null;
    if(filterModel?.items?.length > 0){
      let item = filterModel.items[0];
      search = {
        field: item.field,
        value: item.value
      };
    }

     const {data} = await AxiosClient.get("personal-area/charts", {
        params: {
          page: page,
          pageSize: pageSize,
          sortModel: JSON.stringify(sortModel),
          filter: JSON.stringify(search)
        },
        signal: options.signal || null
      });

      return data;
  }

  static async deleteItem(id){ 
    const {data} =  await AxiosClient.delete("personal-area/chart/" + id);
    return data;
  }

}

export default ChartService;
