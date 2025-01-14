import { LightningElement } from 'lwc';
const defaultData={Name:'',Email:'',EmployeeId:'',Idea:''}

const BASE_URL = 'http://localhost:3002'
export default class App extends LightningElement {
    loader=false
    formData=defaultData
    isSubmitted = false
    get checkinmsg(){
        return `${this.formData.Name}`
    }
    formChange(event){
        const{name,value} =event.detail;
        this.formData = {...this.formData,[name]:value}
    }
    checkinHandler(event){
        event.preventDefault();
        this.loader = true
        this.formData = {...this.formData , "Date": new Date().toLocaleDateString() , "Time" : new Date().toLocaleTimeString()}
        fetch(`${BASE_URL}/api/v1/submit`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(this.formData)
        }).then(response=>response.json()).then(result=>{
            console.log(result)
            if(result.success){
                this.isSubmitted = true
                window.setTimeout(()=>{
                    this.isSubmitted=false
                    this.formData = {...defaultData}
                },6000)
            }
        }).catch(error=>console.log(error))
        .finally(()=>{this.loader=false})
    }
}
