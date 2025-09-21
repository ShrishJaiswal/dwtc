import React from "react";
import useHookForAccountAddressListFetch from "../hooks/AddressList";
import Error from "../../../dwtc-common-utility/src/error/Error";
import { Loading } from "../../../dwtc-common-utility/src/error/Loading";
import { useNavigate } from "react-router-dom";
import { ErrorConstants, LanguageKey } from "../../../dwtc-common-utility/src";
import NoObjectFound from "../../../dwtc-common-utility/src/error/NoObjectFound";
import { AddNewAddressButton } from "../buttons/AddNewAddressButton";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function SavedAddresses(){

    const {addressList, error:addressListError, loading:addressListLoading, account} = useHookForAccountAddressListFetch();
    const navigate = useNavigate();

    if (addressListError){
        return(
            <Error text={ErrorConstants.EXCEPTION_SOMETHING_WENT_WRONG} />
        )
    }

    if (addressListLoading){
        return(
            <Loading />
        )
    }

    const handleEditBtnClick = (addressId) => {
      navigate(`/address/${account.accountId}/${addressId}`);
    }

    const shippingAddresses = addressList.items.filter(addr => addr.addressType === 'shipping');

    return(
        <section className="Saved_Address_Section">
        <div className="hospi_saved_address_wrapper">
          <div className="container">
            <div className="saved_address_wrapper">
              <div className="title_box">
                <h4 className="brown_title">{LanguageKey.YourSavedAddressHeading}</h4>
              </div>
              <div className="address_inner_box">
                { shippingAddresses === null || shippingAddresses === undefined || shippingAddresses.length === 0? (
                  <NoObjectFound text={LanguageKey.NO_ACCOUNT_ADDRESS_FOUND} />
                ) : (
                  shippingAddresses?.map(address => (
                    <div key={address.id} className="save_address_box">
                      <span className="img_box">
                        <img src="images/svg/home_address_icon.svg" alt="" />
                      </span>
                      <div className="txt_box">
                        <h6>
                            {LanguageKey.STREET}: {address.streetAddressLine1} <br />
                            {LanguageKey.SUBURB}: {address.addressLocality} <br />
                            {LanguageKey.STATE}: {address.addressRegion} <br />
                            {LanguageKey.COUNTRY}: {address.addressCountry}
                        </h6>
                      </div>
                      <span className="iconbox">
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleEditBtnClick(address.id);
                            }}
                        >
                            Edit                         
                        </button>
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="btn_box">
                  <AddNewAddressButton accountId={account.accountId}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}