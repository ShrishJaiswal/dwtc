<#assign cpMedia = cpContentHelper.getCPDefinitionImageFileVersion(cpCatalogEntry.getCPDefinitionId(), request) />
<#assign allSpecs = cpContentHelper.getCPDefinitionSpecificationOptionValues(cpCatalogEntry.getCPDefinitionId()) />

<#assign cpDefinitionOptionRelLocalService = serviceLocator.findService("com.liferay.commerce.product.service.CPDefinitionOptionRelLocalService")>
<#assign cpInstanceLocalService = serviceLocator.findService("com.liferay.commerce.product.service.CPInstanceLocalService")/>
<#assign commercePriceEntryLocalService = serviceLocator.findService("com.liferay.commerce.price.list.service.CommercePriceEntryLocalService")/>
<#assign cpDefinitionLinkLocalService = serviceLocator.findService("com.liferay.commerce.product.service.CPDefinitionLinkLocalService") />
<#assign cpDefinitionLocalService = serviceLocator.findService("com.liferay.commerce.product.service.CPDefinitionLocalService") />
<#assign assetVocabularyLocalService = serviceLocator.findService("com.liferay.asset.kernel.service.AssetVocabularyLocalService") />
<#assign assetCategoryLocalService = serviceLocator.findService("com.liferay.asset.kernel.service.AssetCategoryLocalService") />
<#assign assetEntryAssetCategoryRelLocalService = serviceLocator.findService("com.liferay.asset.entry.rel.service.AssetEntryAssetCategoryRelLocalService") />
<#assign assetEntryLocalService = serviceLocator.findService("com.liferay.asset.kernel.service.AssetEntryLocalService") />
<#assign commerceChannelLocalService = serviceLocator.findService("com.liferay.commerce.product.service.CommerceChannelLocalService") />

<#assign jsonFactoryUtil = staticUtil["com.liferay.portal.kernel.json.JSONFactoryUtil"] />

<#assign groupedProducts = jsonFactoryUtil.createJSONObject() />

<#assign cpDefinitionLinks = cpDefinitionLinkLocalService.getCPDefinitionLinks(cpCatalogEntry.getCPDefinitionId()) />

<#list cpDefinitionLinks as cpDefinitionLink>
    <#assign relatedCPDefinition = cpDefinitionLocalService.fetchCPDefinitionByCProductId(cpDefinitionLink.getCProductId()) />
    <#assign productName = relatedCPDefinition.getName() />

    <#assign groupNameObj = cpDefinitionLink.getExpandoBridge().getAttribute("groupName")! />
    <#assign groupName = (groupNameObj?has_content)?then(groupNameObj, "Default") />

    <#if !groupedProducts.has(groupName)>
        <#assign _ = groupedProducts.put(groupName, jsonFactoryUtil.createJSONArray()) />
    </#if>

    <#assign jsonArray = groupedProducts.getJSONArray(groupName) />
    <#assign _ = jsonArray.put(productName) />
</#list>

<#assign currencyCode = commerceChannelLocalService.fetchCommerceChannelBySiteGroupId(themeDisplay.getSiteGroupId()).getCommerceCurrencyCode() />

<#assign categoryIds = assetCategoryLocalService.getCategoryIds("com.liferay.commerce.product.model.CPDefinition", cpCatalogEntry.getCPDefinitionId()) />
<#assign globalGroupId = themeDisplay.getCompanyGroupId() />

<#assign deliveryAssetVocabulary = assetVocabularyLocalService.fetchGroupVocabulary(globalGroupId, "delivery")/>
<#assign categoryName = "" />

<#if deliveryAssetVocabulary??>
<#list categoryIds as categoryId>
    <#assign category = assetCategoryLocalService.getCategory(categoryId) />
    <#if category.getVocabularyId() == deliveryAssetVocabulary.getVocabularyId()>
      <#assign categoryName = category.getName() />
		</#if>
</#list>
</#if>

<div class="direction-ltr">
    <form action="#" method="post" name="${renderResponse.getNamespace()}fm">
        <!-- Header Component Section Start-->
        <!-- Header Component Section End -->
        <!-- breadcrumb start -->
        <!-- breadcrumb end -->
        <!-- Product Detail Section Start -->
        <section class="Product_Deatil_Section">
            <div class="hospi_product_wrapper">
                <div class="container">
                    <div class="product_inner_wrapper">
                        <div class="product-main-box1">
                            <div class="product_img_box">
                                <@adaptive_media_image.img
                                    fileVersion=cpMedia
                                    class="product-image"
                                    alt="Product Image"
                                />
                                <@liferay_commerce_ui["add-to-wish-list"] CPCatalogEntry=cpCatalogEntry />
                                <div class="delivery_text_box">
                                    <span>
                                        <img src="images/svg/delivery_hour_icon.svg" alt="">
                                    </span>
                                    <#if categoryName??>
																			<p>
																				${categoryName}
																			</p>
																		</#if>
                                </div>
                            </div>
                        </div>
                        <div class="product-main-box2">
                            <div class="pro_name_box">
                                <h4>
                                    ${cpCatalogEntry.getName()}
                                </h4>
                                <div class="btn_box">
                                </div>
                            </div>
                            <div class="pro_description_box">
                                <div class="description_box">
                                    <p>
                                        ${cpCatalogEntry.getShortDescription()}
                                    </p>
                                </div>
                                <div class="description_box">
                                    <div class="tooltip_box">
                                        <h6>Product Contains</h6>
                                        <div class="tool">
                                            <div class="tooltip_inner_box">
                                                                                        <#if allSpecs[1]?has_content>
                                                <#list allSpecs[1..] as specs>
                                                    <ul>
                                                        <li>
                                                            ${specs.getValue()}
                                                        </li>
                                                    </ul>
                                                </#list>
                                                                                            </#if>
                                            </div>
                                        </div>
                                    </div>
                                                                <#if allSpecs[0]?has_content>
                                    <h6 class="small_txt">
                                        ${allSpecs[0].getValue()}
                                    </h6>
                                                                </#if>
                                </div>
                            </div>
                            <div class="choose_type_box">
                                <div class="custom_radio">
                                    <div class="custom_radio_row">
                                        <div class="option_selector">
                                            <@liferay_commerce_ui["option-selector"] CPDefinitionId=cpCatalogEntry.getCPDefinitionId() namespace=renderResponse.getNamespace() />
                                        </div>
                                        <div class="option_price">
                                            <#list cpCatalogEntry.getCPSkus() as sku>
                                                <#assign cpInstance = cpInstanceLocalService.getCPInstance(
                                                    cpCatalogEntry.getCPDefinitionId(),
                                                    sku.getSku()
                                                ) />

                                                <#if cpInstance??>
                                                    <#assign promoPriceEntry = commercePriceEntryLocalService.getInstanceBaseCommercePriceEntry(
                                                        cpInstance.getCPInstanceUuid(),
                                                        "promotion",
                                                        null
                                                    ) />

                                                    <#assign listPriceEntry = commercePriceEntryLocalService.getInstanceBaseCommercePriceEntry(
                                                        cpInstance.getCPInstanceUuid(),
                                                        "price-list",
                                                        null
                                                    ) />

                                                    <#assign finalPrice = listPriceEntry.getPrice() />

                                                    <#if promoPriceEntry?? && promoPriceEntry.getPrice()?? && promoPriceEntry.getPrice() != 0 && promoPriceEntry.getPrice() < listPriceEntry.getPrice()>
                                                        <#assign finalPrice = promoPriceEntry.getPrice() />
                                                    </#if>
                                                    <p>
																											<span>
																												${currencyCode}
																											</span>
                                                      <span>
																												${finalPrice?string("0.00")}
																											</span>
																							      </p>

                                                </#if>
                                            </#list>
                                        </div>
                                        <div>
                                                <@liferay_commerce_ui["add-to-cart"] alignment="left" inline=true CPCatalogEntry=cpCatalogEntry namespace=renderResponse.getNamespace()/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Product Detail Section End -->
        <!-- Package Include Section Start -->
        <section class="Package_Include_Section">
            <div class="hospi_package_include_wrapper">
                <div class="container">
                    <div class="heading_box">
                        <h3 class="heading_text1">
                            Package Include :
                        </h3>
                    </div>
                    <div class="package_inner_wrapper">
                        <div class="package_box">
                            <#list groupedProducts.keySet() as group>
                                <h4>
                                    ${group}
                                </h4>
                                <ul>
                                    <#assign arr = groupedProducts.getJSONArray(group) />
                                    <#list 0..arr.length()-1 as i>
                                    <li>${arr.getString(i)}</li>
                                    </#list>
                                </ul>
                            </#list>
                        </div>
                    </div>
                    <div class="other_options">
                    </div>
                </div>
            </div>
        </section>
    </form>
    <!-- Package Include Section End -->
</div>

<#noparse>
    <script>
    $(document).ready(function () {
        var $optionSelector = $(".option_selector");
        var $otherOptions = $(".other_options");

        function moveSelectors() {
            var $selectors = $optionSelector.find(".lfr-tooltip-scope");

            if ($selectors.length > 1) {
                $selectors.slice(1).appendTo($otherOptions);
            }
        }

        setTimeout(moveSelectors, 1000);
        var observer = new MutationObserver(function () {
            moveSelectors();
        });
        observer.observe($optionSelector[0], { childList: true, subtree: true });
    });
    </script>
</#noparse>