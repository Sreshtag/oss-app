import { LightningElement, api } from 'lwc';
export default class CustomInput extends LightningElement {
    @api name="field";
    @api type ="text";
    @api required =false;
    @api label ="form label";
    get uniqueId() {
        return `${this.name} ${Math.random().toString(16).slice(2)}`;
    }
    InputHandler(event){
        const{name,value}=event.target;
        this.dispatchEvent(new CustomEvent("formchange",{
            detail:{
                name,
                value
            }
        }))

    }
}
