import React, { useState } from "react";
import useRatingSystemPicklist from "../../hooks/RatingSystemPicklist";
import { AdaptiveMediaImgParser } from "../../utility/AdaptiveMediaParser";
import { useCartItemFetch } from "../../hooks/CartItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../buttons/BackButton";
import { Error, ErrorConstants, getMicroServiceUserAgent, LanguageKey, Loading } from "../../../../dwtc-common-utility/src";

export default function ProductRating() {
    const oAuth2Client = getMicroServiceUserAgent();
    const {cartId, externalReferenceCode} = useParams();
  
    const { ratingSystem, error: ratingSystemError, loading: ratingSystemLoading } =
      useRatingSystemPicklist();
    const { cartItems: cartItem, error: cartItemError, loading: cartItemLoading } =
      useCartItemFetch({ cartId });

    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({});
    const [productFeedback, setProductFeedback] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  
    // Fetch existing feedback from order-level API
    useEffect(() => {
      if (!cartId) return;
  
      async function fetchOrderFeedback() {
        try {
          const res = await oAuth2Client?.fetch(
            `/o/headless-commerce-admin-order/v1.0/orders/${cartId}/feedbackRatingOnOrder`
          );
          const data = res;
          console.log("orders feedback data:: ", JSON.stringify(data));
  
          const feedbackMap = {};
          if (data?.items?.length) {
            data.items.forEach((item) => {
              feedbackMap[item.productId] = {
                userFeedbackRating: item.userFeedbackRating,
                feedbackDescription: item.feedbackDescription,
                alreadyRated: true,
              };
            });
          }
  
          setProductFeedback(feedbackMap);
        } catch (err) {
          console.error("Error fetching order feedback:", err);
        }
      }
  
      fetchOrderFeedback();
    }, [cartId]);
  
    const getRatingText = (value) => {
      if (!value) return "";
      if (value < 3) return LanguageKey.BAD_RATING;
      if (value < 5) return LanguageKey.GOOD_RATING;
      return LanguageKey.EXCELLENT_RATING;
    };
  
    const handleRatingSelect = (productId, ratingValue) => {
      setFormData((prev) => ({
        ...prev,
        [productId]: {
          ...(prev[productId] || {}),
          userFeedbackRating: ratingValue,
        },
      }));
    };
  
    const handleDescriptionChange = (productId, value) => {
      setFormData((prev) => ({
        ...prev,
        [productId]: {
          ...(prev[productId] || {}),
          feedbackDescription: value,
        },
      }));
    };
  
    const handleSubmit = async () => {
      if (!cartItem?.items?.length) return;
      setSubmitting(true);
  
      try {
        for (const item of cartItem.items) {
          const productId = item.productId;
          const existing = productFeedback[productId];
          if (existing?.alreadyRated) continue;
  
          const data = formData[productId];
          if (!data) continue;
  
          // fetch product details to get ERCs
          const res = await oAuth2Client?.fetch(
            `/o/headless-commerce-admin-catalog/v1.0/products/${item.productId}`
          );
          const product = res;

          const prevFeedbackRating = existing?.feedbackRating || 0;
          const prevTotalCount = existing?.totalRatingCount || 0;

          const newUserRating = parseInt(data.userFeedbackRating);

          const newFeedbackRating = prevFeedbackRating + newUserRating;
          const newTotalCount = prevTotalCount + 1;
          const newAverageRating = newFeedbackRating / newTotalCount;
  
          // build feedback payload
          const payload = {
            userFeedbackRating: newUserRating,
            feedbackRating: newFeedbackRating,
            r_feedbackRatingOnOrder_commerceOrderId: parseInt(cartId),
            feedbackDescription: data.feedbackDescription || "",
            totalRatingCount: newTotalCount,
            feedbackRatingOnProductERC: product.externalReferenceCode,
            r_feedbackRatingOnProduct_CPDefinitionERC: product.externalReferenceCode,
            feedbackUserName: Liferay.ThemeDisplay.getUserName(),
            r_feedbackRatingOnProduct_CPDefinitionId: product.productId,
            averageRating: newAverageRating,
            feedbackRatingOnOrderERC: externalReferenceCode,
            r_feedbackRatingOnOrder_commerceOrderERC: externalReferenceCode,
            feedbackUserId: parseInt(Liferay.ThemeDisplay.getUserId()),
            productId: parseInt(item.productId),
          };
  
          console.log("Submitting feedback payload:", JSON.stringify(payload));
  
          await oAuth2Client?.fetch(`/o/c/feedbackratings/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        }
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error submitting feedback:", error);
      } finally {
        setSubmitting(false);
      }
    };
  

    const handleCloseBtnClick = () => {
        setShowSuccessModal(false);
        navigate("/");
    };

    if (cartItemLoading || ratingSystemLoading) {
      return <Loading />;
    }
  
    if (cartItemError) {
      return <Error text={ErrorConstants.EXCEPTION_CART_ITEM_FETCH} />;
    }
  
    if (ratingSystemError) {
      return <Error text={ErrorConstants.EXCEPTION_RATING_LIST_ERROR} />;
    }
  
    // check if any item still editable
    const hasAnyEditable = cartItem?.items?.some(
      (item) => !productFeedback[item.productId]?.alreadyRated
    );

    return (
      <div>
        <section className="Feedback_Rating_Section">
          <div className="hospi_feedback_rating_wrapper">
            <BackButton toPath={"/"} />
            <div className="container">
              {cartItem?.items?.map((item) => {
                const existing = productFeedback[item.productId] || {};
                const alreadyRated = existing.alreadyRated;
                const selectedValue = alreadyRated
                  ? existing.userFeedbackRating
                  : formData[item.productId]?.userFeedbackRating;
  
                return (
                  <div className="feedback_rating_wrapper" key={item.productId}>
                    <div className="feedback_box1">
                      <div className="img_box">
                        <AdaptiveMediaImgParser
                          adaptiveMediaImageHTMLTag={item?.adaptiveMediaImageHTMLTag}
                        />
                      </div>
                    </div>
                    <div className="feedback_box2">
                      <h5 className="title_txt">{item?.name}</h5>
                      <div className="middle_title_box">
                        <h5>{LanguageKey.RATING_TEXT}</h5>
                        <h4>{getRatingText(selectedValue)}</h4>
  
                        <div className="rating-box">
                          <div className="rating-container">
                            {ratingSystem?.items?.map((rating) => (
                              <div key={rating.id}>
                                <input
                                  type="radio"
                                  name={`rating-${item.productId}`}
                                  value={rating.key}
                                  id={`star-${item.productId}-${rating.key}`}
                                  checked={String(selectedValue) === String(rating.key)}
                                  disabled={alreadyRated}
                                  onChange={() =>
                                    handleRatingSelect(item.productId, rating.key)
                                  }
                                />
                                <label htmlFor={`star-${item.productId}-${rating.key}`}>
                                  &#9733;
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <form>
                        <textarea
                          placeholder={LanguageKey.WRITE_REVIEW_PLACEHOLDER}
                          value={
                            alreadyRated
                              ? existing.feedbackDescription
                              : formData[item.productId]?.feedbackDescription || ""
                          }
                          disabled={alreadyRated}
                          onChange={(e) =>
                            handleDescriptionChange(item.productId, e.target.value)
                          }
                        ></textarea>
                      </form>
                    </div>
                  </div>
                );
              })}
  
              {hasAnyEditable && (
                <div className="btn_box">
                  <button
                    className="filled_btn filled_btn_lg trigger"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {LanguageKey.SUBMIT_FEEDBACK}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        {showSuccessModal && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">Feedback submitted successfully</div>
                <div className="modal-footer">
                  <button onClick={handleCloseBtnClick}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}