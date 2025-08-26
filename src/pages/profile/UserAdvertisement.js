import { useEffect, useState } from "react"
import { fetchAdvertisementList } from "../../services/AdvertisementServices";

export default function UserAdvertisement() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    fetchAdvertisementList()
    .then((data)=>{
      setAdvertisements(data.anuncios)
    })
    .catch(err => console.log(err))
    .finally(()=>{setLoading(false)})
  },[])

  return (
  <>
    {advertisements.length > 0 &&
      <div className="adver-content">
        { advertisements.map((ad, index) => {
          return (
            <div className="inner-adver" style={{
                                backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#EBEBEB',
                              }}>
              <div className="title">Anuncio del {ad.date}</div>
              <div className="description" dangerouslySetInnerHTML={{ __html: ad.descripcion }}></div>
            </div>
          )
        })}
      </div>
    }
  </>
  )
}