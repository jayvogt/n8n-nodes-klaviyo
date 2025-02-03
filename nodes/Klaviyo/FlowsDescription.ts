import { INodeProperties } from 'n8n-workflow';

// When the resource `flow` is selected, this `operation` parameter will be shown.
export const FlowsDescriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['flow'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'get_all',
				action: 'Get all',
				routing: {
					request: {
						method: 'GET',
						url: '/flows',
					},
				},
			},
		],
		default: 'get_all',
	},
];

export const FlowsFields: INodeProperties[] = [];
