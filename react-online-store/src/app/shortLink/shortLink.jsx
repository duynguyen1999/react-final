



const shortLink =  (loading, error, data) =>{
    if (loading) return <p>Loading...</p>;
  
    if (error) return <p>Something went wrong</p>;
  
    return data.link;
}

export {shortLink}