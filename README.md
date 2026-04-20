# n8n-nodes-klaviyo

This is an n8n community node. It lets you use the Klaviyo CRM service in your n8n workflows.

Klaviyo is a unified customer platform that empowers businesses to build smarter digital relationships through personalized email and SMS marketing, leveraging their own data to drive engagement and growth. It offers tools for automation, segmentation, and analytics, specifically designed for e-commerce and direct-to-consumer brands.

This project is a work in progress. Please feel free to submit feedback and requests for additional operations and I will add them as I have time.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Custom Metrics
- Get All
- Get One

### Events
- Get All
- Get One
- Create

### Metrics
- Get All
- Get One

### Profiles
- Get All
- Get One
- Create
- Update
- Create or Update

### Templates
- Create
- Delete
- Get All
- Get One
- Update

## Credentials

If you don't already have a Klaviyo account, you can [sign up here](https://www.klaviyo.com/sign-up).

This node authenticates to the Klaviyo API and your account using a private key. Steps for obtaining this private key can be found in the [Klaviyo documentation](https://help.klaviyo.com/hc/en-us/articles/7423954176283).

Klaviyo API private key must have minimum permissions of Read Access to the Events resource to pass the authentication test.

## Compatibility

Tested on version 1.75.2, but likely will work on lower versions.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Klaviyo Account Sign-up](https://www.klaviyo.com/sign-up)
* [Klaviyo API documentation](https://developers.klaviyo.com/en/reference/api_overview)

## Version history

### v1

- Main release


