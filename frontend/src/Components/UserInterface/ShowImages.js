import React from 'react'

export const ShowImages = ({ data }) => {
  return (<>
    <div style={{ display: "flex", width: "60rem", justifyContent: "center" }}>
      {data.map(image => {
        return <div style={{ height: "8rem", width: "8rem", margin: "2rem", backgroundImage: `url('${image}')`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain" }} />
      })}
    </div>
  </>
  )
}