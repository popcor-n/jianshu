import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from  'react-redux'
import *as actionCreator from './store/actionCreator'
import * as LoginAction  from '../../pages/login/store/actionCreator'
import * as WriteAction  from '../../pages/write/store/actionCreator'
import * as searchAction  from '../../pages/search/store/actionCreator'
import { Link } from 'react-router-dom'
import { 
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    SearchInfo,SearchIfTitle,SearchIfSwitch,SearchIfItem,
    HeadRight,
    Button,Span,Sign,Name
    } from './style'

class Header extends Component {
    upDate() {
        this.forceUpdate()
    }
    componentWillMount(){
        if(document.cookie){
            // const cookieList = JSON.parse(document.cookie);
            let cookieArr = document.cookie.replace(/\s*/g,"").split(";");
            let cookieObj = {} 
            cookieArr.forEach((i) => {
                let arr = i.split("=");
                cookieObj[arr[0]]=arr[1];
            });
            // console.log(cookieObj);
            this.props.setCookie(cookieObj);
        }
        
    }
    render(){
    
        const {isIn, changeSearchValue, handleSearch, handelConChange, searchContent, mouseIn, page, list, focused, isLogin, userName, handleLogOut, handleSearchBlur, handleSearchFocus, handleChangeShow, handleMouseIn, handleMouseOut, handleIsLogin, personEmail } = this.props;
        return (
            <HeaderWrapper>
                <Link to= '/'><Logo /></Link>
                <Nav>
                    <Link to= '/'>
                    <NavItem className= 'left col'>首页</NavItem>
                    </Link>
                    <CSSTransition
                        in= {focused}
                        timeout= {200}
                        classNames= 'slide'
                    >
                        <NavSearch 
                            className={focused ? 'focused' :''} 
                            placeholder= '搜索'
                            onClick= {() => handleSearchFocus(list)}
                            onBlur= {handleSearchBlur}
                            value= {searchContent}
                            onChange={handelConChange}
                            style= {{display: !isIn ? 'inline-block': 'none'}}
                        />
                    </CSSTransition>
                    <Link to= {`/searchTitle/${searchContent}`}
                        style= {{display: !isIn ? 'inline-block': 'none'}}
                        
                    >
                        <Span 
                            // onClick= {()=>changeSearchValue(searchContent)}
                            onClick={this.upDate.bind(this)}
                            className={focused ? 'focused iconfont' :'iconfont'} >&#xe645;
                        </Span>
                    </Link>
                    <SearchInfo
                    style = {{display: focused||mouseIn ? 'block' : 'none'}}
                    onMouseEnter = {handleMouseIn}
                    onMouseLeave = {handleMouseOut}
                    >
                   
                    <SearchIfTitle>
                        热门搜索
                        <SearchIfSwitch
                            onClick = {()=>handleChangeShow(this.spinIcon)}
                        >
                        <span ref = {(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe673;</span>换一批
                        </SearchIfSwitch>
                    </SearchIfTitle>
                    <div>
                        {   
                            list.slice((page-1)*10, page*10).map((item,index) => {
                            return <SearchIfItem key ={index}>{item}</SearchIfItem>
                        })
                        }
                    </div>
                </SearchInfo>

                    <NavItem className= 'right login'>
                        { handleIsLogin(isLogin, userName, handleLogOut, personEmail) }
                    </NavItem>
                </Nav>
                <HeadRight>
                    <Link to= '/write'>
                        <Button className='write-btn'>
                            <span className="iconfont">&#xe616;</span>
                            写文章
                        </Button>
                    </Link>
                    
                </HeadRight>
            </HeaderWrapper>
        )
        
    }
   


}
const mapStateToProps = (state) =>{
    return{
        focused:state.get('header').get('focused'),
        list:state.get('header').get('list'),
        page:state.get('header').get('page'),
        mouseIn:state.get('header').get('mouseIn'),
        searchContent: state.getIn(['header', 'searchContent']),
        isLogin:state.getIn(['login', 'login']),
        userName:state.getIn(['login', 'name']),
        personEmail: state.getIn(['person', 'userEmail']),
        isIn: state.getIn(['search', 'isIn'])
    }
}
const mapDispatchToProps = (dispatch) => ({
    handleSearchFocus(list){
        dispatch ( actionCreator.FocusIp());
        // if(list.size === 0){
        //     dispatch( actionCreator.getHotList() );
        // }
    },
    handleSearchBlur() {
        dispatch ( actionCreator.BlurIp() );
    },
    handleChangeShow(icon) {
        let originAngle = icon.style.transform.replace(/[^0-9]/ig,'');
        //吧 除了0-9以外的字符都剔除
        // console.log(originAngle);
        icon.style.transform = `rotate(${Number(originAngle) + 360}deg)`
        dispatch( actionCreator.ChangeShow() );
    },
    handleMouseIn() {
        dispatch( actionCreator.mouseIn() );
    },
    handleMouseOut() {
        dispatch( actionCreator.mouseOut() );
    },
    handleLogOut(){
        dispatch( LoginAction.changeLogState() );
        dispatch( WriteAction.clearContent() );
        // window.localStorage.clear()
    },
    setCookie(cookieList){
        dispatch( LoginAction.changeLogState(cookieList.name, cookieList.id) );     
    },
    handleIsLogin(isLogin,userName,handleLogOut, personEmail) {
        if(isLogin){
            if(personEmail === window.localStorage.getItem('useremail')) {
                return (
                    <div>
                        <span className= 'logOut' onClick= {handleLogOut}>退出登录</span>
                        <Link to= {`/person/${window.localStorage.getItem('useremail')}`}>
                            <Name 
                            // onClick= {handleLogOut}
                            >{userName}</Name>    
                        </Link>  
                    </div>
                )
            }
            return(
                <Link to= {`/person/${window.localStorage.getItem('useremail')}`}>
                <Name 
                // onClick= {handleLogOut}
                >{userName}</Name>                
                </Link>            
            )
        }else{
            return(
                <Sign>
                    <Link to= '/login' className='logIn'>登录</Link>
                    <Link to= '/signup'><Button className='signUp'>注册</Button></Link>
                </Sign>
            
            )
        }
    },
    handelConChange(e) {
        dispatch (actionCreator.setContent(e.target.value))
    },
    changeSearchValue(value) {
        console.log('in')
        // dispatch(searchAction.setSearchValue(value))
        this.upDate();
        
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)