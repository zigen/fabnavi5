const
    React = require('react'),
    ProjectListStore = require('../stores/ProjectListStore'),
    ProjectStore = require('../stores/ProjectStore'),
    ProjectActionCreator = require('../actions/ProjectActionCreator'),
    jade = require('react-jade'),

    Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    State = require('../utils/FabnaviStateMachine'),

    projectDetail = jade.compileFile(__dirname + '/../templates/ProjectDetail.jade');

const ProjectDetail = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getStateFromStores : function getStateFromStores(){
    return {
      projects : ProjectListStore.getProjectsAll(),
    };
  },

  _onChange : function (){
    this.setState(this.getStateFromStores());
  },
  getInitialState: function(){
    return this.getStateFromStores();
  },

  getDefaultProps: function(){
    return {
      hoge : "hoge",
    };
  },

  getProjectDetail: function(){
    let project ={};
    for(var i in this.state.projects){
      if(this.state.projects[i].id == this.context.router.getCurrentParams().projectId){
        project.description = this.state.projects[i].description;
        project.name = this.state.projects[i].name
        console.log(this.state.projects[i].user);
        project.username = this.state.projects[i].user.nickname;
        project.usericon = this.state.projects[i].user.image;
        project.date = this.state.projects[i].created_at.replace(/T.*$/,"").replace(/-/g," / ");
        project.thumb = this.getThumbnailSrc(i);
      }
    }
    return project;
  },

  getThumbnailSrc: function (a){
    let src = null;
    if( this.state.projects[a].hasOwnProperty("figure") ){
      const thumb = this.state.projects[a].figure;
      if( thumb.hasOwnProperty("attachment") ){
        src = this.state.projects[a].figure.attachment.file.thumb;
      }
    }
    if( src == null || src == "" ){
      src = "/images/kaffcop_icon/fab_samp.jpg";
    }
    return src;
  },

  getUserIconSrc: function (){
    let src = null;
    if( src == null ){
      src = this.props.project.user.image;
    }
  return src;
  },

  render : projectDetail,

  componentWillMount : function(){
    console.log("load detail page");
    ProjectActionCreator.getAllProjects();　
  },

  componentDidMount : function (){
    State.reload();
  },

  componentWillUpdate : function(){
    return {
    };
  },

  componentDidUpdate : function(){
    return {
    };
  },

  componentWillUnmount : function(){
  },
});

module.exports = ProjectDetail;
