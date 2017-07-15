import React from "react";
import {Avatar } from 'antd';
import {Link} from "react-router-dom";
class ShowTopics extends React.Component{
	render(){
		let data = this.props.data
		let tab={
			ask:"问答",
			job:"工作",
			share:"分享"
		}
		return(
			<div>
				{	
					data.length===0?
					 "正在加载"
					:data.map(item=>(
						<div key={item.id}>
							<Avatar src={item.author.avatar_url}/>
							<span>{item.reply_count}/</span>
							<span>{item.visit_count}</span>
							<span style={{padding:"4px",backgroundColor:"hotpink",borderRadius:"4px"}}>{item.top?"置顶":item.good?"精华":tab[item.tab]}</span>
							<Link to={`/topic/${item.id}`}>{item.title}</Link>
						</div>
					))
				}
			</div>
		)
	}
}

export default ShowTopics