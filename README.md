<h1>DWTC</h1>

<h2>Setup Guide</h2>
<h4>Product Setup</h4>
<ol>
  <li>Individual Product</li>
  <ol>
    <li>Go to Control Panel -> Commerce -> Product Screen</li>
    <li>Create a simple product</li>
    <li>Give it a name, short description, full description</li>
    <li>Attach 24 hr delivery category created on Global Site under vocabulary name "delivery". Attach this only if product needs to categorized under 24 hours</li>
    <li>Assign other categories if needed. Remember products under same categories would help in creation of Packaged Product Later</li>
    <li>To add info section</li>
    <ol>
      <li>Add specification with order of 0, 1, 2...</li>
      <li>The 0th index specification should always be KCAL info of the product</li>
      <li>The rest of the specifications with >1 index will be shown in the tooltip of the product</li>
      <li>
      <img width="2550" height="1080" alt="image" src="https://github.com/user-attachments/assets/b422701c-676c-4781-80c1-b100e96c0afa" />
      </li>
      <li>
      <img width="800" height="322" alt="image" src="https://github.com/user-attachments/assets/e6fe0ed4-0840-413c-ad54-f06258699603" />
      </li>
    </ol>
    <li>For Options</li>
    <ol>
      <li>Go to Control Panel -> Commerce -> Options</li>
      <li>Create options by any name</li>
      <li>Go to the product -> option -> attach those options -> enable SKU Contributor -> Single Selection</li>
      <li>After attaching options, go to sku -> click on generate all sku combinations -> here we can set the inventory, pricing</li>
    </ol>
    <li>Go to Configuration -> Enable Display Availability -> Disable Back Order -> Attach Tax Category</li>
  </ol>
  <li>Packaged Product</li>
  <ol>
    <li>For packaged product only options are going to have additional changes rest of the configuration remains same as individual product</li>
    <li>Configuring Options</li>
    <ol>
      <li>Create more options as per the requirement</li>
      <li>Apart from adding option for the selection in PDP page, attach options for package details</li>
      <ol>
        <li>For creation of options for package details, do not enable SKU contrbutor toggle</li>
        <li>Enable "Select from List" value and pricing as Static</li>
        <li>For grouping of 2 options together, keep the name of the 2 options same</li>
        <li>
          <img width="3024" height="1442" alt="image" src="https://github.com/user-attachments/assets/5d31c781-495a-48bd-a536-46e9cee21f81" />
        </li>
        <li>
          <img width="3024" height="1468" alt="image" src="https://github.com/user-attachments/assets/3dc3e7a5-c5ba-4d37-b183-9a50e3b60a39" />
        </li>
        <li>This will group the options under same heading of the package</li>
        <li>Enable required if it is required for the user to select from the option</li>
      </ol>
    </ol>
    <li>Configuration of Relations</li>
    <ol>
      <li>
        <img width="1674" height="790" alt="image" src="https://github.com/user-attachments/assets/613b48fa-7703-4893-a96a-94b9477eddde" />
      </li>
      <li>To showcase above, move to Control Panel -> Products -> Select the product -> Product Relations</li>
      <ol>
        <li>Select the products you want to club up together and keep them under same Custom Fields's "Group name"</li>
        <li>
          <img width="3018" height="1288" alt="image" src="https://github.com/user-attachments/assets/86a30268-ff75-4008-abc6-01a422f1f6cd" />
        </li>
        <li>Products mapped under same "Group Name" will be automatically clubbed together under the very same heading</li>
      </ol>
    </ol>
  </ol>
</ol>
<br>
<h4>Coupon Code</h4>
<ol>
  <li>Go to Control Panel -> Discounts -> Create the coupon with apply to on "Total" of the order</li>
  <li>
    <img width="3022" height="1134" alt="image" src="https://github.com/user-attachments/assets/47855bf4-37df-46b1-a964-2511c3282334" />
  </li>
  <li>Provide a unique ERC (Mandatory)</li>
  <li>Toggle Active</li>
  <li>Provide Coupon Desc if any</li>
  <li>Enable Coupon Code</li>
  <ol>
    <li>
      <img width="3024" height="1160" alt="image" src="https://github.com/user-attachments/assets/74995825-88d5-4e8f-9d2f-3dac89e7d109" />
    </li>
    <li>
      Provide the coupon code name
    </li>
    <li>Provide Max usage and Max account usage. If not restricted, provide 0</li>
    <li>Go to Eligibility</li>
    <ol>
      <li>If this coupon is enable for all then keep "All Accounts", "Channel Specific", "All Order Types"</li>
      <li>If it is available only for specific accounts, then enable "Specific Account"</li>
      <li>Remember that each account should only have 1 default disccount at any given time</li>
    </ol>
  </ol>
</ol>
<br>
<h4>Account</h4>
<ol>
  <li>Create a B2B Account for each user</li>
  <li>Creation of type B2B is necessary as it would help in creation of Channel Defaults (Especially in case of coupon code)</li>
  <li>Remember accounts should never be created by Liferay automatically</li>
</ol>
<br>
<h4>Picklist</h4>
<ol>
  <li>TakeAway Location Address Picklist</li>
  <ol>
    <li><img width="1950" height="668" alt="image" src="https://github.com/user-attachments/assets/07093e9c-ab01-473b-a11a-d4bf7b5fbd50" />
    </li>
    <li>City :- The first word after 1st colon is city (Mandatory)</li>
    <li>Region :- The word after 2nd colon is region (Mandatory). You can get the region of the Country from Control Panel -> Countries Management. Ensure to keep same name as present in Liferay</li>
    <li>Lattitude, Longitude:- The last word after last colon are the lats and lngs for the coordingate of the location</li>
    <li>Key:- this is to be kept same</li>
    <li>ERC:- the pincode of the location</li>
  </ol>
  <li>Delivery Charges</li>
  <ol>
    <li>
      <img width="1960" height="512" alt="image" src="https://github.com/user-attachments/assets/98dd2c88-509e-4e86-9198-856cba5466b0" />
    </li>
    <li>Name:- The delivery charge value</li>
    <li>Key:- City</li>
  </ol>
  <li>Feedback Rating System</li>
  <ol>
    <li>
      <img width="1980" height="1026" alt="image" src="https://github.com/user-attachments/assets/29de09a0-4248-436b-b6af-da77eb475e4a" />
    </li>
    <li>The picklist dedicated to configure no. of stars</li>
  </ol>
</ol>
<br>
<h4>VAT Charges</h4>
<ol>
  <li>Create a tax category (Global Menu -> Commerce -> Tax Categories)</li>
  <li>Go to Channels -> Open the channel -> Scroll Down till you find Tax Calculations heading </li>
  <li>
    <img width="2964" height="702" alt="image" src="https://github.com/user-attachments/assets/94a2ede7-1f9f-46fc-85ba-5d7d99ce63bd" />
  </li>
  <li>Enable the tax category under "Fixed Rate"</li>
  <li>
    <img width="1992" height="1158" alt="image" src="https://github.com/user-attachments/assets/43ebafd2-14ac-4d4b-93f5-4d654b9b9925" />
  </li>
  <li>
    <img width="1990" height="796" alt="image" src="https://github.com/user-attachments/assets/4b28f030-c7c3-4f44-a239-d55e1929f59e" />
  </li>
</ol>
<br>
<h4>Default Payment Engine</h4>
<ol>
  <li><img width="3024" height="992" alt="image" src="https://github.com/user-attachments/assets/10f3030d-6c5a-45a9-a2af-41d53fd8fb0a" />
  </li>
  <li>Enabale this payment method and mark it as active</li>
</ol>
