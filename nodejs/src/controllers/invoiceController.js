import invoiceService from "../services/invoiceService";

let handleCreateInvoice = async (req, res, io) => {
  let data = await invoiceService.createInvoice(req.body);
  if (data.status === 200) io.emit("create-invoice", "success");
  return res.json(data);
};

module.exports = {
  handleCreateInvoice,
};
