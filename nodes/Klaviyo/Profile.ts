import { INodeProperties } from "n8n-workflow";
import { parsePageCursors } from './GenericFunctions';
import {
	getProfileAttrFields,
	postProfileAttrFields,
	profileSortValues
} from "./ProfileFields";

export const ProfileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['profile'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many profiles',
				routing: {
					request: {
						method: 'GET',
						url: '/profiles',
					},
				},
			},
			{
				name: 'Get One',
				value: 'getOne',
				action: 'Get one profile',
				routing: {
					request: {
						method: 'GET',
						url: '/profiles',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new profile',
				routing: {
					request: {
						method: 'POST',
						url: '/profiles',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a profile',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/profiles/{{ $parameter.updateProfileId }}'
					},
				},
			},
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				action: 'Create or update a profile',
				routing: {
					request: {
						method: 'POST',
						url: '/profile-import',
					},
				},
			},
		],
		default: 'getAll',
	},
];


/* --------------------------------------------------------
		POST
----------------------------------------------------------- */
const createProfileFields: INodeProperties[] = [
	{
		displayName: 'One or more of the following are required: email, phone number, or external ID',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['create','createOrUpdate']
			},
		},
	},
	{
		displayName: 'Attributes',
		name: 'createAttributes',
		placeholder: 'Add Attribute',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['create','createOrUpdate']
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'options',
						options: postProfileAttrFields,
						default: 'email',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
			{
				displayName: 'Properties',
				name: 'property',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					}
				]
			}
		],
		routing: {
			request: {
				body: {
					data: {
						type: 'profile',
						attributes: '={{ {\
							...Object.fromEntries(($value.attribute || []).map(({ key, value }) => [key, value])),\
							properties: {\
								...Object.fromEntries(($value.property || []).map(({ key, value }) => [key, value]))\
							}\
						} }}',
					},
				},
			},
		},
	},
];

const updateProfileFields: INodeProperties[] = [
	{
		displayName: 'Profile ID',
		name: 'updateProfileId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['update']
			},
		},
		required: true
	},
	{
		displayName: 'Attributes',
		name: 'updateAttributes',
		placeholder: 'Add Attribute',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['update']
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'options',
						options: postProfileAttrFields,
						default: 'email',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
			{
				displayName: 'Properties',
				name: 'property',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					}
				]
			}
		],
		routing: {
			request: {
				body: {
					data: {
						type: 'profile',
						id: '={{ $parameter["updateProfileId"] }}',
						attributes: '={{ {\
							...Object.fromEntries(($value.attribute || []).map(({ key, value }) => [key, value])),\
							properties: {\
								...Object.fromEntries(($value.property || []).map(({ key, value }) => [key, value]))\
							}\
						} }}',
					},
				},
			},
		},
	},
];

const postProfileFields: INodeProperties[] = [
	...createProfileFields,
	...updateProfileFields,
]

/* --------------------------------------------------------
		GET
----------------------------------------------------------- */
const getAllProfileFields: INodeProperties[] = [
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		default: '',
		routing: {
			request: {
				qs: {
					'page[cursor]': '={{ $value }}'
				},
			},
			output: {
				postReceive: [parsePageCursors],
			},
		},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		default: 20,
		typeOptions: {
			maxValue: 100,
			minValue: 1,
			numberPrecision: 1,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getAll'],
			},
		},
		routing: {
			request: {
				qs: {
					'page[size]': '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Sort',
		name: 'profileSort',
		type: 'options',
		default: '',
		options: profileSortValues,
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getAll'],
			},
		},
		routing: {
			request: {
				qs: {
					sort: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		placeholder: 'Add filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getAll'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Field',
				name: 'field',
				values: [
					{
						displayName: 'Field',
						name: 'field',
						type: 'options',
						// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
						options: [
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased,n8n-nodes-base/node-param-display-name-miscased-id
								name: 'id',
								value: 'id',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'email',
								value: 'email',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'phone_number',
								value: 'phone_number',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'external_id',
								value: 'external_id',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: '_kx',
								value: '_kx',
							},
						],
						default: 'id',
					},
					{
						displayName: 'Operator',
						name: 'operator',
						type: 'options',
						// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
						options: [
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'equals',
								value: 'equals'
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'any',
								value: 'any',
							},
						],
						default: 'equals',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						hint: 'If "any" is selected, add a comma-separated list in the value',
						default: '',
					},
				],
			},
			{
				displayName: 'Date',
				name: 'date',
				values: [
					{
						displayName: 'Field',
						name: 'field',
						type: 'options',
						options: [
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'created',
								value: 'created',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'updated',
								value: 'updated',
							}
						],
						default: 'created',
					},
					{
						displayName: 'Operator',
						name: 'operator',
						type: 'options',
						options: [
							{
								name: 'greater-than',
								value: 'greater-than',
							},
							{
								name: 'less-than',
								value: 'less-than',
							}
						],
						default: 'greater-than',
					},
					{
						displayName: 'Date',
						name: 'value',
						type: 'dateTime',
						default: ''
					}
				]
			}
		],
		routing: {
			request: {
				qs: {
					filter: '={{ [\
						...($value.field ?? []).map(({ field, operator, value }) => `${operator}(${field},${JSON.stringify(operator == "any" ? value.split(",") : value)})`),\
						...($value.date ?? []).map(({ field, operator, value }) => `${operator}(${field},${value}Z)`)\
					].join(",") }}',
				}
			}
		}
	},
];

const getOneProfileFields: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'profileId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getOne']
			},
		},
		routing: {
			request: {
				url: '=/profiles/{{ $value }}'
			},
		},
	},
];

const getProfileFields: INodeProperties[] = [
  ...getAllProfileFields,
  ...getOneProfileFields,
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Add parameter',
		options: [
			{
				displayName: 'Profile Fields',
				name: 'profileFields',
				type: 'multiOptions',
				hint: 'Select which fields are returned.',
				options: getProfileAttrFields,
				routing: {
					request: {
						qs: {
							'fields[profile]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
						},
					},
				},
				default: [],
			},
		],
		default: {},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getAll', 'getOne'],
			},
		},
	},
];

export const ProfileFields: INodeProperties[] = [
	...postProfileFields,
  ...getProfileFields
];