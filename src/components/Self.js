import React from 'react'
import {url} from '../config'
import axios from 'axios'
import {message, Spin,Avatar} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'

class Self extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			topics:null
		}
	}
	componentDidMount(){
		let loginname=this.props.match.params.loginname
		axios.get(`${url}/user/${loginname}`)
			.then(res=>this.setState({data:res.data.data}))
			.catch(err=>console.log(err))
		axios.get(`${url}/topic_collect/${loginname}`)
			.then(res=>this.setState({topics:res.data.data}))
			.catch(err=>console.log(err))
	}
	render(){
		let {data,topics}=this.state
		console.log(topics)
		console.log(data)
		return(
			<div style={{padding: '10px'}}>
				<h1><Link to="/">主页</Link></h1>

				{
					data?(
						<div>
							<div>
								<img src={data.avatar_url} alt=""/>
								<span>{data.loginname}</span>
								<h2>{data.score} 积分</h2>
								<h2>{topics?topics.length:0}个话题收藏</h2>

							</div>
							<div>
								<h2>最近创建话题</h2>
								{
									data.recent_topics.map(item=>
										<div key={item.id}>
											<Avatar src={item.author.avatar_url}/>
											<span ><Link to={`/topic/${item.id}`}>{item.title}</Link></span>
										</div>
										
									)
								}
							</div>
						</div>
						
						
					):"正在加载"
				}
			</div>
		)
	}
}

export default Self