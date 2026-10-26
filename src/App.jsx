import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const BUCKET = 'images'

function photoUrl(path) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

export default function App() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    supabase
      .from('photos')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error(error)
        else setPhotos(data)
      })
  }, [])

  return (
    <div>
      <h1>Album của tôi</h1>
      {photos.map((p) => (
        <img key={p.id} src={photoUrl(p.storage_path)} alt={p.caption} width="300" />
      ))}
    </div>
  )
}