export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                resolve(err)
            }
        })
    })
}

export const showModel = (content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success(res) {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const showToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 2000,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
// 登陆
export const wxLogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            }
        })
    })
}
 // 支付请求
export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
     wx.requestPayment({
        ...pay,
       success: (result) => {
        resolve(result)
       },
       fail: (err) => {
         reject(err);
       }
     });
       
    })
  }