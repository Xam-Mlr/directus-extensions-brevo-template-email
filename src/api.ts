import { defineOperationApi } from '@directus/extensions-sdk';
import * as brevo from '@getbrevo/brevo'



type Options = {
	to            : string,
	brevo_api_key : string,
	template_id   : string,
	template_data : {
		key : string,
		var: string
	}[]
};

export default defineOperationApi<Options>({
	id: 'operation-template-brevo',
	handler: async ({ to, brevo_api_key, template_id, template_data}) => {

		let apiInstance = new brevo.TransactionalEmailsApi();
		apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevo_api_key)
		let sendSmtpEmail = new brevo.SendSmtpEmail();

		sendSmtpEmail.to = [{ "email":to }]
		sendSmtpEmail.templateId = parseInt(template_id);

		const params = template_data.reduce<Record<string, string>>(
			(acc, item) => {
			  acc[item.key] = item.var;
			  return acc;
			},
			{}
		);
		sendSmtpEmail.params = params;
		
		try{
			await apiInstance.sendTransacEmail(sendSmtpEmail);

			console.log('API called successfully');
			return({
				name:"Successful"
			});
		}
		catch(error:any){

			console.error(error.body);
			throw new Error(error.body.message);
		}

	},
});