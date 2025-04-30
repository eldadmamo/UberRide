import React from "react"
import PhoneLoginPresenter from "./PhoneLoginPresenter"

interface IProps {}

interface IState {
    countryCode: string;
    phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<IProps,IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
          countryCode: "+251", 
          phoneNumber: "",
        };
      }

      onInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<IState, keyof IState>);
      };
    
      // Handler for form submission
      onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {countryCode,phoneNumber} = this.state;
        console.log(countryCode,phoneNumber)
      };
      
    
    public render(){
        const {countryCode, phoneNumber} = this.state;
        return <PhoneLoginPresenter 
        countryCode={countryCode} 
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        loading={false}
        />
    }
}


export default PhoneLoginContainer;