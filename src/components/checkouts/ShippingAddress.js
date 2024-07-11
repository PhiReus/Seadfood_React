import React from "react";

const ShippingAddress = () => {
  return (
    <>
      <div className="bg-light p-30">
        <div className="row">
          <div className="col-md-6 form-group">
            <label>First Name</label>
            <input className="form-control" type="text" placeholder="John" />
          </div>
          <div className="col-md-6 form-group">
            <label>Last Name</label>
            <input className="form-control" type="text" placeholder="Doe" />
          </div>
          <div className="col-md-6 form-group">
            <label>E-mail</label>
            <input
              className="form-control"
              type="text"
              placeholder="example@email.com"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Mobile No</label>
            <input
              className="form-control"
              type="text"
              placeholder="+123 456 789"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Address Line 1</label>
            <input
              className="form-control"
              type="text"
              placeholder="123 Street"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Address Line 2</label>
            <input
              className="form-control"
              type="text"
              placeholder="123 Street"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Country</label>
            <select className="custom-select">
              <option selected="">United States</option>
              <option>Afghanistan</option>
              <option>Albania</option>
              <option>Algeria</option>
            </select>
          </div>
          <div className="col-md-6 form-group">
            <label>City</label>
            <input
              className="form-control"
              type="text"
              placeholder="New York"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>State</label>
            <input
              className="form-control"
              type="text"
              placeholder="New York"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>ZIP Code</label>
            <input className="form-control" type="text" placeholder={123} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
