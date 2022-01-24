import React from 'react'
import { signupStyle } from '../../style/signup'

interface IValidate {
  email: boolean
  pw: boolean
}

function Signup() {
  const classes = signupStyle()
  const [userId, setUserId] = React.useState<string>('')
  const [userName, setUserName] = React.useState<string>('')
  const [passwd, setPasswd] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('');
  const [confirmPw, setConfirmPw] = React.useState<string>('')
  const [validate, setValidate] = React.useState<IValidate>({
    email: true,
    pw: true,
  })

  const handleEmail = (e: any) => {
    setUserId(e.target.value)
    let result = true
    setValidate({ ...validate, email: result })
  }

  const submitSignUp = async () => {
    let payload = {
      userId,
      userName,
      email,
      passwd
    }

    let data = await fetch(`http://localhost:4000/api/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    window.location.href = '/login'
  }

  return (
    <React.Fragment>
      <div className={classes.signup}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div className={classes.title}>onoffmix 회원가입</div>
            <div className={classes.input}>
              <input type="text" placeholder="name" onChange={(e: any) => setUserName(e.target.value)} />
            </div>
            <div className={classes.input}>
              <input type="text" placeholder="Email" onChange={(e: any) => setEmail(e.target.value)} />
            </div>
            <div className={classes.input}>
              <input type="text" placeholder="id" onChange={(e: any) => handleEmail(e)} />
            </div>
            <div className={classes.input}>
              <input type="password" placeholder="password" onChange={(e: any) => setPasswd(e.target.value)} />
            </div>
            <div className={classes.input}>
              <input type="password" placeholder="confirm password" onChange={(e: any) => setConfirmPw(e.target.value)} />
            </div>
            
            <div className={classes.button}>
              <button
                onClick={() => {
                  if (userId === '') return
                  if (userName === '') return
                  if (passwd === '' || confirmPw !== passwd) return
                  if (confirmPw === '') return

                  submitSignUp()
                }}
              >
                회원가입 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Signup