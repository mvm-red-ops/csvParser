import React, {Component} from 'react';
import { nullLiteral } from '@babel/types';
import ResultTable from './ResultTable';
import Papa from 'papaparse'
import { CSVLink } from "react-csv";
import NetworkDropdown from './NetworkDropdown'
import ButtonExampleAnimated from './ButtonExampleAnimated'
import './CSVParser.css'

const initialState = {
  file:null,
  fileUploaded: false,
  data: null,
  fields: null,
  network: true,
  csvData: [],
  csvReady: null,
  instructions: "Upload a Prelog",
  requiredHeaders: null,
  fieldObjectsForDownload: null,
  headersSet: false,
  rowsSet: false,
  downloadHeaders: null,
  errors: [],
  table: null
}
const secondState = {
  file:null,
  fileUploaded: false,
  data: null,
  fields: null,
  csvData: [],
  csvReady: null,
  requiredHeaders: null,
  fieldObjectsForDownload: null,
  headersSet: false,
  rowsSet: false,
  downloadHeaders: null,
  errors: []
}
export default class CSVParser extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.onChange = this.onChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.setMasterCsv = this.setMasterCsv.bind(this)
        this.updateHeaderRequirement = this.updateHeaderRequirement.bind(this)
      }
      
    componentDidMount(){
      if(this.props.table){
        this.setState({
          table:true
        })
      }
    }
    onChange(e) {
        this.setState({
            file:e.target.files[0],
            fileUploaded: true
        })

        console.log('file uploaded')
    }


    getData(file) {
        const data = Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: this.updateData
        })
    }

    updateData(result) {
        const data = result.data;
        const fields = Object.keys(data[0])
        const cleanBlankFields = fields.filter(f => f !== '')
        let idCounter = 0
        const fieldObjects = cleanBlankFields.map(textField => {
          idCounter++;
          return {header: textField, required: false, id: idCounter};
        })
        const fieldObjectsForDownload = cleanBlankFields.map(textField => {
          idCounter++;
          return {label: textField, key: idCounter};
        })
        this.setState({
          data: data,
          fields: fieldObjects,
          downloadHeaders: fieldObjectsForDownload
        });
        console.log('updated data')
    }
    


    setMasterCsv(rowData){
        this.setState({
          data: rowData,
          rowsSet: true
        })
    }

    exportCSV = () => {
      const fieldObjectsForDownload = this.state.fieldObjectsForDownload
      return(
        <CSVLink className='export-button' data={this.state.data} headers={fieldObjectsForDownload}>
          Export
        </CSVLink>
        )
    }



    setNetwork = (e, data) => {
      e.preventDefault()
      const network = data.options[data.value - 1]
      console.log('hit',this.state.fieldsEstablished )
      if(this.state.downloadHeaders){
        this.resetToSecondState()
      }
      if( !network ){
        this.setState({
          network: network,
          instructions: "Select a Network"
        })
      } else {
        this.setState({
          network: network,
          instructions: "Upload a Prelog"
        })
      }
      console.log('network set')

    }
    updateHeaderRequirement = (e, id, header ) => {
      e.preventDefault()
      const updatedHeaders = this.state.fields.forEach( header => { 
         if(header.id === id){
           header.required = !header.required
         }; 
        });
        this.setState({
          headers: updatedHeaders
        })

        console.log('update header')
    }

    displayForm = () => {
      return(
      <form className='input-form'>
          <input 
          className='input-field'
          type='file' 
          accept='.csv, .xlsx, .xsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' 
          onChange={this.onChange}
          />
      </form>)
    }

    setHeaderStateTrue = () => {
      this.setState({
        headersSet: true
      })
      console.log('set header state')
    }

    addError = (error) => {
      this.state.errors.push(error)
      console.log(this.state.errors)
    }

    setFieldsHandler = (e) => {
      e.preventDefault()
      this.setState({
        fieldsEstablished: true,
        instructions: `Row Count: ${this.state.data.length}`
      })
    }

    resetState = () => {
      this.setState(initialState)
    }

    resetToSecondState = () => {
      this.setState(secondState)
    }

    render(){
      const { 
        data, 
        fields,rowsSet, 
        fileUploaded, 
        file, 
        network, 
        instructions, 
        headersSet, 
        fieldsEstablished,
        downloadHeaders,
        table } = this.state

      const {
        setMasterCsv, 
        addError, 
        setHeaderStateTrue, 
        updateHeaderRequirement, 
        setFieldsHandler,
        resetState } = this 

      return(
            <div className='csv-wrapper'>
              <div className='instructions-div'>
                {network && fields && !fieldsEstablished ? ButtonExampleAnimated(setFieldsHandler, resetState) : <h1>{instructions}</h1> }
              </div>
              <div className='file-upload-div'>
               { network && !fileUploaded ? this.displayForm() : null}
               { fieldsEstablished ? this.exportCSV() : null}
              </div>        
              { fileUploaded && !data ? this.getData(file) : null }
              <div>
                {data && fields ? 
                <ResultTable 
                  data={data} 
                  fields={fields} 
                  setCsvData={setMasterCsv} 
                  updateHeaderRequirement={updateHeaderRequirement} 
                  setHeaderStateTrue={setHeaderStateTrue}
                  cleanRows={headersSet}
                  rowsSet={rowsSet}
                  addError={addError}
                  fieldsEstablished={fieldsEstablished}
                  downloadHeaders={downloadHeaders}
                  />  : null}
              </div>
            </div>
        )
    }
}

