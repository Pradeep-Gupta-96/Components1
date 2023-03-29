import { useState } from 'react'

function App() {

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // handle File
  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
          setExcelFileError(null);
          setExcelFile(selectedFile);
        
        // let reader = new FileReader();
        // reader.readAsArrayBuffer(selectedFile);
        // reader.onload = (e) => {
        //   setExcelFileError(null);
        //   setExcelFile(e.target.result);
        // }
      }
      else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('plz select your file');
    }
  }
  // console.log(excelFile)

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (excelFile !== null) {
        const formData = new FormData()
        formData.append('file', excelFile)
        console.log(formData)
        console.log(excelFile)
        
        const res = await  fetch('http://localhost:4000/importUser', {
                        method: 'POST',
                        body: formData
                    })
        const result = await res.blob()
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
          onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
            onChange={handleFile} required></input>
          {excelFileError && <div className='text-danger'
            style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
            style={{ marginTop: 5 + 'px' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

// import React from 'react';

// class App extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             file: null
//         }
//         this.sendFile = this.sendFile.bind(this)
//     }

//     sendFile(event) {
//         event.preventDefault();
//         //console.log(this.state);
//         let formData = new FormData();
//         formData.append('file', this.state.file);
//        console.log(formData)
//        console.log( this.state.file)
//         fetch('http://localhost:4000/importUser', {
//             method: 'POST',
//             body: formData
//         })
//             .then(response => response.blob())
//             // .then(blob => {
//             //     let url = window.URL.createObjectURL(blob);
             
//             //     let a = document.createElement('a');
               
//             //     a.href = url;
//             //     a.download = "filename.xlsx";
//             //     document.body.appendChild(a); // for firefox
//             //     a.click();
//             //     a.remove();  //remove element once used
//             // })
//             .catch(error => {
//                 console.error(error)
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello, world!</h1>
//                 <form onSubmit={this.sendFile}>
//                     <input type="file" name="file" onChange={e => this.setState({ file: e.target.files[0] })} />
//                     <button type="submit">Send</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default App;