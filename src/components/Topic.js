import React from "react";
import axios from "axios";
import {url} from "../config";
import { Input,Button ,Card,Avatar,Icon,Modal,BackTop} from 'antd';
import {Link} from "react-router-dom";
import moment from 'moment';
class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			comment:"",
			reply:"",
			visible: false,
			replyInfo: null
		}
	}
	getData(){
		let id = this.props.match.params.id
		axios.get(`${url}/topic/${id}`)
			.then(res=>this.setState({data:res.data.data}))
			.catch(err=>alert(err))
	}
	componentDidMount(){
		this.getData()
	}

	handleChange(type,replyInfo){
		console.log(type)
		let id = this.state.data.id
		let {reply}=this.state
		let accesstoken = sessionStorage.accesstoken
		if(accesstoken){
			let content = type
			let reply_id = replyInfo?replyInfo.id:""
			axios.post(`${url}/topic/${id}/replies`,{accesstoken,content,reply_id})
				.then(res=>{
					this.setState({comment:""})
					this.getData()
					if(content===reply)this.setState({visible: false})
				})
				.catch(err=>console.log(err))
		}else{
			alert("请先登陆")
			return
		}
		
	}
	handleLike(reply_id){
		let accesstoken = sessionStorage.accesstoken
		if(accesstoken){
			axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
				.then(res=>{
					this.getData()
				})
				.catch(err=>alert(err))
		}else{
			alert("请先登陆")
		}
	}
	showReply(reply){
		// console.log(reply)
		this.setState({visible: true, replyInfo: reply, reply: `@${reply.author.loginname} `})
	}
	render(){
		let {data,comment,replyInfo,reply,visible}=this.state
		// console.log(data)
		return(
			<div>
				<Card loading={!data}>
					{
						data?(
							<div className="content">
								<h1>{data.title}</h1>
								<div>
									<span>作者：{data.author.loginname}</span>
									<span>浏览量：{data.visit_count}</span>
									<span>回复：{data.reply_count}</span>
								</div>
								<div dangerouslySetInnerHTML={{__html:data.content}}/>

								<h1>发表评论：</h1>
								<Input type="textarea" value={comment} onChange={e=>this.setState({comment:e.target.value})}/>
								<Button type='primary' onClick={this.handleChange.bind(this,comment)}>提交</Button>

								<h1>全部回复：</h1>
								{
									data.replies.map(item=>(
										<div key={item.id}>
											<Avatar src={item.author.avatar_url} />
											<div>
												<span>{item.author.loginname}·{moment(item.create_at).fromNow()}</span>
												<span>
													<Icon type="like" onClick={this.handleLike.bind(this, item.id)}/>{item.ups.length}&nbsp;&nbsp;
													<Icon type="message" onClick={this.showReply.bind(this, item)}/>
												</span>
											</div>
											<div dangerouslySetInnerHTML={{__html: item.content}} />
										</div>
									))
								}
							</div>
							
						)
						:null
					}
				</Card>
				<Modal
				title={replyInfo? `回复：${replyInfo.author.loginname}` : '回复：'}
				visible={visible}
				onOk={this.handleChange.bind(this,reply,replyInfo)}
				onCancel={()=>this.setState({visible: false})}
				>
					<Input type="textarea" rows={4} value={reply} onChange={e=>this.setState({reply: e.target.value})} placeholder='留下您的评论'/>
				</Modal>
				<BackTop />
			</div>
		)
	}
}

export default Topic