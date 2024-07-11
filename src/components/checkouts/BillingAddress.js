import React from "react";

const BillingAddress = () => {
  let customer = localStorage.getItem("customer");
  customer = customer ? JSON.parse(customer) : "";

  return (
    <>
      <div className="bg-light p-30 mb-5">
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Name</label>
            <input className="form-control" name="name" type="text" placeholder="John Doe" defaultValue={customer.name} />
          </div>
          <div className="col-md-6 form-group">
            <label>Address</label>
            <input className="form-control" name="address" type="text" placeholder="55/54/7 ..." defaultValue={customer.address} />
          </div>
          <div className="col-md-6 form-group">
            <label>E-mail</label>
            <input
              className="form-control"
              type="text"
              placeholder="example@email.com"
              defaultValue={customer.email}
              name="email"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Mobile No</label>
            <input
              className="form-control"
              type="text"
              placeholder="+123 456 789"
              defaultValue={customer.phone}
              name="phone"
            />
          </div>
         
          {/* <div className="col-md-12 form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="newaccount"
              />
              <label className="custom-control-label" htmlFor="newaccount">
                Create an account
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="shipto"
              />
              <label
                className="custom-control-label"
                htmlFor="shipto"
                data-toggle="collapse"
                data-target="#shipping-address"
              >
                Ship to different address
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BillingAddress;
