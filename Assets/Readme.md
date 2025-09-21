<h2>Create a UserAgent Headless Api with following configs</h2>
<ol>
  <li>
    ERC:- dwtc-user-agent-application
  </li>
  <li>
LiferayHeadlessAdminAdress (read)
  </li>
  <li>
Liferay.Headless.Admin.List.Type (create/read/update)
  </li>
  <li>
Liferay.Headless.Admin.User (create/read/update)
  </li>
  <li>
Liferay.Headless.Admin.Catalog (create/read/update)
  </li>
<li>
Liferay.Headless.Commerce.Admin.Channel (create/read/update)
</li>
<li>
Liferay.Headless.Commerce.Admin.Order (create/read/update)
</li>
<li>
Liferay.Headless.Commerce.Admin.Pricing (create/read/update)
</li>
<li>
Liferay.Headless.Commerce.Delivery.Catalog (create/read/update)
</li>
  <li>
Liferay.Headless.Commerce.Delivery.Order (create/read/update)
  </li>
<li>
Liferay.Headless.Delivery (read)
</li>
<li>
C_Feedback (create/read/update)
</li>
<li>
Liferay.Commerce (create/read/update)
  </li>
</ol>
<span>
  import   com.liferay.oauth2.provider.service.*;
import   com.liferay.oauth2.provider.model.*;


		OAuth2Application auth2Application = OAuth2ApplicationLocalServiceUtil.fetchOAuth2Application(companyId, "id-ee4c50b0-3cb3-fb20-90a2-5de4e3d1d148");
		OAuth2ApplicationLocalServiceUtil.updateExternalReferenceCode(auth2Application.getOAuth2ApplicationId(), "dwtc-user-agent-application");
</span>
