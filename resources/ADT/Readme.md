<h1>PDP Detail ADT</h1>

<h2>Steps to be followed:</h2>
<ul>
    <li>Add the ftl code to a template (Product Detail Template)</li>
    <li>Create a custom field by the name (groupName) in Product Link entity. Remember to keep the name as mentioned</li>
    <li>Create an Asset Vocabulary by the name (delivery) in Global Site and add categories for example :- 24 Hour Delivery. Remember to keep the name of vocabulary as mentioned</li>
    <li>For product configuration please follow steps below:-</li>
    <ol>
        <li>Only 1 option should be present with SKU Contributor enabled</li>
        <li>Other options should not exist with SKU contributor</li>
        <li>Tooltip data should come from specification having positions from 1 and more. Specification with position 0 will be listed below the tooltip in figma. For example (220 Kcal per 100g)in the figma, this comes from the specification listed under position 0</li>
        <li>For packaged product listing, create Product Relations and name the custom field "groupName" with the heading of the packages. For example 4 Salads from figma.</li>
        <li>For selection in product packages, create options with List Type Selection.</li>
        <li>Note*:- For product selection in Liferay Options, products should exist in same category</li>
    </ol>
</ul>
