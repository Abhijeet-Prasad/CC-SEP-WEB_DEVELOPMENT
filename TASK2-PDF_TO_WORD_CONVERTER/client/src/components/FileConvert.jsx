import React, {Fragment, useState} from 'react'
import axios from 'axios'
import fileDownload  from 'js-file-download'
import './FileConvert.css'
import Loading from './Loading'

const FileConvert = () => {
    const [file, setFile] = useState('');
    const[filename, setFilename] = useState('Choose File');
    const [coverting, setConverting] = useState(false);

    const handleChange = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setConverting(true)
        const formData = new FormData();

        formData.append('file', file);

        // Upload the file to the server and convert the file there.
        try{
            await axios.post('/ConvertToWord', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob'
            }).then((res)=>{
                // download the converted file from the server
                fileDownload(res.data, file.name.substring(0, file.name.lastIndexOf('.'))+'.docx');
                setConverting(false)
            })
        }
        catch(err){
            if(err.response.status === 500){
                console.log('Directory Not Found...');
            }
            else{
                console.log(err.response.data.msg);
            }
            setConverting(false)
        }
    }

    return (
        <Fragment>
            {coverting ? <Loading/>:""}
            <form onSubmit={handleSubmit}>
                <div className='input-group mb-3'>
                    <div className='custom-file'>
                        <input type="file" className='custom-file-input' id="inputGroupFile" onChange={handleChange}/>
                        <label className='custom-file-label' htmlFor="inputGroupFile">{filename}</label>
                    </div>
                </div>
                <input type="submit" value="Convert" className='btn btn-primary btn-block col-12 mt-4'/>
            </form>
        </Fragment>
    )
}

export default FileConvert