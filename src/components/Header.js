import React from "react";
import { Button,Modal,Input,Avatar ,Menu,Dropdown,Icon,Badge} from 'antd';
import axios from "axios";
import {url} from "../config";
import {Link} from "react-router-dom";
console.log(url)
class Header extends React.Component{
	constructor(){
		super()
		this.state={
			islogin:false,
			visible:false,
			input:"3f77acb1-d753-4393-b784-44913190e6a8",
			user:null,
			messageCount:null,
			loginname:""
		}
	}
	handelOk(){
		let accesstoken=this.state.input.trim()
		axios.post(`${url}/accesstoken`,{accesstoken})
			.then(res=>{
				// console.log(res)
				sessionStorage.accesstoken=accesstoken
				this.setState({user:res.data,visible:false,islogin:true,input:"",loginname:res.data.loginname})
				this.getMessage(accesstoken)
			})
			.catch(err=>alert("登陆失败"))
	}
	handelOut(){
		this.setState({
			islogin: false,
			user: null
		})
		sessionStorage.removeItem('accesstoken')
	}
	getMessage(accesstoken){
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
			.then(res=> this.setState({messageCount: res.data.data}))
			.catch(err=> console.log('message 获取失败'))
	}
	render(){
		let {islogin,visible,input,user,messageCount,loginname}=this.state
		let menu = <Menu className="menu">
						<Menu.Item>
							<Link to={`/user/${loginname}`}>个人中心</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/message">消息中心</Link>
						</Menu.Item>
						<Menu.Item>
							<Button type="danger" onClick={this.handelOut.bind(this)}>登出</Button>
						</Menu.Item>
					</Menu>
		return(
			<header className="header">
				<Link to="/">cnode</Link>
				{
					islogin?
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							<Badge count={messageCount}/>
							<Avatar src={user.avatar_url}/> 
						</a>
					</Dropdown>
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
								<Input  value={input} onChange={e=>this.setState({input:e.target.value})} />
							</Modal>
						}
					</div>
					
				}
				
			</header>
		)
	}
}

export default Header