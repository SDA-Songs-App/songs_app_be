import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import { addSong, updateSong, getSongById } from "../api/songsApi"

function Form(){
    const[song, setSong] = useState({
        Category:'', 
        language:'',
        audioUrl : '',
        LyricsContents:[
            {
                title:'',
                chorus:'',
                verse1:'',
                verse2:'',
                verse3:'',
                verse4:'',
                verse5:''
            }
        ]

    })
    const navigate = useNavigate()
    const {id} = useParams()
    //fetch song
   const fetchSong = async () =>{
        const {dt} = await getSongById(id)
      setSong(dt)
    }
    useEffect(() =>{
        if(id)
            fetchSong()
    }, [id])

    const handleChange = (event) =>{
       const {name, value} = event.target;
       setSong({...song, [name]:value})
    }
    const handleLricsChange = (e) =>{
        const {name, value} = e.target;
        setSong({
            ...song, 
            LyricsContents:[{...song.LyricsContents[0], [name]:value}]
        })
    }
    const handleSudmit = async(ev) =>{
         ev.preventDefault()
         if(id) await updateSong(id, song)
         else  await addSong(song)
        navigate('/')
    }
    return (
        <div className="container">
            <h1>{id ? "Edit song":"Add Song"}</h1>
            <form onSubmit={handleSudmit}>
               <input 
                     name = 'Category' 
                     placeholder="Category"
                     value={song.Category}
                     onChange={handleChange}
                     ></input>
                     <input
                     name = 'language'
                     value={song.language}
                     onChange={handleChange}
                     ></input>
                     <input
                     name = 'audioFileUrl'
                     value={song.audioUrl}
                     onChange={handleChange}></input>
            </form>
        </div>
    )
}
export default Form