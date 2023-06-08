// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req : any, res : any) {
  const getData = async () => {
    try{
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=db850985-1de1-4dd3-9e17-67d22a67f5c8`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      );
  
      const data = await response.json();
  
      res.status(200).json({ data });
    }catch(error) {
      console.log(error)
    };

  }
  getData();
}
