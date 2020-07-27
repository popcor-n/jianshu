import React, { Component } from 'react'
import { connect } from 'react-redux'
import  * as action from './store/actionCreator'
import * as style from './style'
import { Redirect, Link } from 'react-router-dom'
class Login extends Component {
    render() {
        const { setLoginData, login } = this.props;
        if(!login){
            return (
                <style.LoginWrapper>
                    <style.Logo>
                        <Link to= './'>
                            <style.LogoPic />
                        </Link>
                 </style.Logo>
                    <style.Main>
                        <h4 className='title'>
                            <Link to= './login' className='active'>登录</Link>
                            <b>.</b>
                            <Link className='signup' to= './signup'>注册</Link>
                        </h4>
                        <style.Input>
                            <span className="iconfont">&#xe6e6;</span>
                            <input placeholder='邮箱' type= 'text' id='number' ref= {(input) => {this.number = input}} / >
                        </style.Input>
                        <style.Input>
                            <span className="iconfont">&#xe620;</span>                    
                            <input placeholder='密码' type= 'password' id='password' ref={(input) => { this.pass = input }} / >
                        </style.Input>
                        <style.Button
                            onClick= {()=>setLoginData(this.number.value, this.pass.value)}
                        >登录</style.Button>
                    </style.Main>
                </style.LoginWrapper>
            )
        }else{
            return <Redirect to= './' />
        }
        
    }
}
const mapStateToProps = (state) => ({
    login:state.getIn(['login', 'login'])
});
const mapDispatchToProps = (dispatach) => ({
    setLoginData(number, pass) {
        dispatach(action.setLoginData(number, pass))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)