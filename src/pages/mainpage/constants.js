const customerForm =['id','客户全称','客户邮编','客户公司地址','客户公司电话','联系人','联系电话','开户银行','银行帐号','联系人信箱','客户传真','状态'];
const goodsForm =['id','商品名称','产地','规格','包装','生产批号','批准文号','描述','价格','供应商编号','状态'];
const importsForm =['id','供应商编号','支付类型','进货时间','操作员','数量','注释','商品编号'];
const returnForm =['id','供应商编号','支付类型','退货时间','操作员','数量','注释','商品编号'];
const supplyerForm =['id','供应商全称','供应商邮编','公司地址','公司电话','联系人','联系人电话','开户银行','银行帐号','联系人邮箱','公司传真','状态'];
const salesForm =['id','客户编号','支付类型','销售时间','操作员','数量','注释','商品编号'];
const salesReturnForm =['id','客户编号','支付类型','退货时间','操作员','数量','注释','商品编号'];
const inventoryForm =['id','商品编号','数量'];
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
export default summaryForm;