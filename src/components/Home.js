import React from "react";
import axios from "axios";
import {url} from "../config";
import { Tabs,Avatar ,Button} from 'antd';
import ShowTopics from "./ShowTopics"
const TabPane = Tabs.TabPane;
class Home extends React.Component{
	constructor(){
		super()
		this.state={
			data:{
				all:{topics:[],page:1},
				good:{topics:[],page:1},
				ask:{topics:[],page:1},
				share:{topics:[],page:1},
				job:{topics:[],page:1}
			},
			tab:"all"
		}
	}
	getDate(tab,page){
		axios.get(`${url}/topics?limit=20&tab=${tab}&page=${page}`)
		.then(res=>{
			let newDate=this.state.data
			newDate[tab].topics=[...newDate[tab].topics,...res.data.data]
			newDate[tab].page=page
			this.setState({
				data:newDate
			})
		})
		.catch(err=>alert(err))
	}
	handleK(key){
		this.setState({tab:key})
		if(this.state.data[key].topics.length===0){
			this.getDate(key,1)
		}else{
			return
		}
		
	}
	handleMore(tab){
		this.getDate(tab,this.state.data[tab].page+1)
	}
	componentDidMount(){
		this.getDate("all",1)
	}
	render(){
		let{data,tab}=this.state
		return(
			<div>
				<Tabs defaultActiveKey="all" onChange={this.handleK.bind(this)}>
				    <TabPane tab="全部" key="all">
						<ShowTopics data={data.all.topics} />
				    </TabPane>
				    <TabPane tab="精华" key="good"><ShowTopics data={data.good.topics} /></TabPane>
				    <TabPane tab="分享" key="share"><ShowTopics data={data.share.topics} /></TabPane>
				    <TabPane tab="问答" key="ask"><ShowTopics data={data.ask.topics} /></TabPane>
				    <TabPane tab="工作" key="job"><ShowTopics data={data.job.topics} /></TabPane>
				</Tabs>
				<Button type='primary' style={{width: '100%'}} onClick={this.handleMore.bind(this,tab)}>加载更多</Button>
			</div>
		)
	}
}

export default Home