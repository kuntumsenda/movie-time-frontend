export function useApi() {
  const { $axios } = useNuxtApp();

  /**
   * @param endpoint
   * @param params
   * @returns
   */
  const fetchData = async (
    endpoint: string,
    params: Record<string, any> = {}
  ) => {
    try {
      const response = await $axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return { fetchData };
}
