 const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.data; // Access the "data" property from the response object
};
export default fetcher;