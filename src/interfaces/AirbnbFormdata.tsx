interface AirbnbFormdata {
    _id: string,
   
      accommodates: number,
      address: {
          country: string,
              street: string
          
  
      }
      bathrooms: number,
      bed_type: string,
      bedrooms: number,
      beds: number,
      description: string,
      host: {
          host_id: string,
          host_about: string,
          host_name: string
        }
      name: string,
      price: number,
      room_type: string
  }


  export default AirbnbFormdata;