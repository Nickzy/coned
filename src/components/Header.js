import React from "react";
import { Button,Modal,Input } from 'antd';
import axios from "axios";
import {url} from "../config"
console.log(url)
class Header extends React.Component{
	constructor(){
		super()
		this.state={
			islogin:false,
			visible:false,
			input:""
		}
	}
	handelOk(){
		let accesstoken=this.state.input.trim()
		axios.post(`${url}/accesstoken`,{accesstoken})
			.then(res=>console.log(res))
			.catch(err=>alert("登陆失败"))
	}
	render(){
		let {islogin,visible,input}=this.state
		return(
			<header className="header">
				<h1>cnode</h1>
				{
					islogin?
					<div>user</div>
					:
					<div>
						{
							!visible?<Button type="primary" onClick={()=>this.setState({visible:true})} >登陆</Button>
							:
							<Modal
								title="Basic Modal"
								visible={visible}
								onOk={this.handelOk.bind(this)}
								onCancel={()=>this.setState({visible:false})}
								okText="确定"
								cancelText="取消"
								>
								<Input placeholder="accesstoken" value={input} onChange={e=>this.setState({input:e.target.value})} />
							</Modal>
						}
					</div>
					
				}
				
			</header>
		)
	}
}

export default Header