import { LightningElement } from 'lwc';
const defaultData={Name:'',Email:'',EmployeeId:''}


export default class App extends LightningElement {
    formData=defaultData
    formChange(event){
        const{name,value} =event.target;
        this.formData = {...this.formData,[name]:value}
    }
    checkinHandler(event){
        event.preventDefault()
        console.log(this.formData)
    }
}
