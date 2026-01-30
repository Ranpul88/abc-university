const { createClient } = require("@supabase/supabase-js")

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY

const supabase = createClient(url, key)

export default function uploadFile(file){
    return new Promise(
        (resolve, reject)=>{
            const timeStamp = Date.now()
            const fileName = timeStamp + "_" + file.name

            supabase.storage.from("course-content").upload(fileName, file, {
                cacheControl: "3600",
                upsert: false
            })
                .then(()=>{
                    const publicUrl = supabase.storage.from("course-content").getPublicUrl(fileName).data.publicUrl
                    resolve(publicUrl)
                })
                .catch((error)=>{
                    reject(error)
                })
        }
    )
}