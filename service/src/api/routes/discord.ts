import express, { Request, Response } from "express";
import { error, success } from "../utils";
import { AuthorizationService, TimetableService } from "../../services";
const axios = require('axios');

const router = express.Router();

export const discordWebhook = async (request: Request, response: Response) => {
    let webhookUrl = "https://discord.com/api/webhooks/1297267673767608472/cdwpQHgq4MAL_7jRuA2MXZS_rc84XbI0R77kV0dnZfJLykxVOpiDVZzlH7iQeGAclcxv"
    
    let message = "Schedule created successfully with name: "+request.body.name;
    if (!request.body.name) message += "No Name";
    
    try {
        await axios.post(webhookUrl, {
            content: message,
        });

        return response.status(200);
    } catch (error) {
        console.error('Error sending message:', error);
        return response.status(500);
    }
}

router.post("/", discordWebhook);

export default router;