import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields(props) {

  const classes = useStyles();

  const [state, setState] = React.useState({});
  const changeHandler = (e) => {
    console.log(state);
    setState((prev) => ({
     ...prev,
      [e.target.name]: e.target.value
    }))}; 

  const formGenerator = (whatForm) => {
      const formComponent = whatForm.map((item,i) => {
          if (item.includes("时间")){
            return (<TextField
                id="datetime-local" 
                key={i}
                label={item}
                name={item}
                variant="outlined"
                type="datetime-local"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{shrink: true}}
                onChange={changeHandler}/>)
          } else if (item.includes("数量")){
            return (<TextField key={i} id="outlined-number" label={item} name={item} type="number" variant="outlined" onChange={changeHandler}/>)
          } else {
            return (<TextField key={i} id={whatForm+item} label={item} name={item} variant="outlined" onChange={changeHandler}/>)
          }
      })

    return (
      <form className={classes.root} noValidate autoComplete="off">
            {formComponent}
      </form>
    )}

  const customerForm =['客户编号','客户全称','客户邮编','客户公司地址','客户公司电话','联系人','联系电话','开户银行','银行帐号','联系人信箱','客户传真','状态'];
  const goodsForm =['商品编号','商品名称','产地','规格','包装','生产批号','批准文号','描述','价格','供应商编号','状态'];
  const importsForm =['编号','供应商编号','支付类型','进货时间','操作员','数量','注释','商品编号'];
  const returnForm =['编号','供应商编号','支付类型','退货时间','操作员','数量','注释','商品编号'];
  const supplyerForm =['供应商编号','供应商全称','供应商邮编','公司地址','公司电话','联系人','联系人电话','开户银行','银行帐号','联系人邮箱','公司传真','状态'];
  const salesForm =['编号','客户编号','支付类型','销售时间','操作员','数量','注释','商品编号'];
  const salesReturnForm =['编号','客户编号','支付类型','退货时间','操作员','数量','注释','商品编号'];
  const inventoryForm =['编号','商品编号','数量'];
  const summaryForm = {
    'customerForm':customerForm,
     'goodsForm':goodsForm,
     'importsForm':importsForm,
     'returnForm':returnForm,
     'supplyerForm':supplyerForm,
     'salesForm':salesForm,
     'salesReturnForm':salesReturnForm,
     'inventoryForm':inventoryForm
}

  if (summaryForm.hasOwnProperty(props.formnav)){
    return formGenerator(summaryForm[props.formnav])
  } else {
    return formGenerator(inventoryForm)
  }
}
