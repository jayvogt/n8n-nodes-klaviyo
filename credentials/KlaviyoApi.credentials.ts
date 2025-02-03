import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class KlaviyoApi implements ICredentialType {
	name = 'klaviyoApi';
	displayName = 'Klaviyo API';
	documentationUrl = 'https://developers.klaviyo.com/en/docs/authenticate_';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			default: '',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Klaviyo-API-Key " + $credentials.token}}',
				Accept: 'application/json',
				revision: '2023-01-24',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://a.klaviyo.com/api',
			url: '/flows',
		},
	};
}
