/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as OpikApi from "../../api/index";
import * as core from "../../core";
import { DeleteAttachmentsRequestEntityType } from "./DeleteAttachmentsRequestEntityType";

export const DeleteAttachmentsRequest: core.serialization.ObjectSchema<
    serializers.DeleteAttachmentsRequest.Raw,
    OpikApi.DeleteAttachmentsRequest
> = core.serialization.object({
    fileNames: core.serialization.property("file_names", core.serialization.list(core.serialization.string())),
    entityType: core.serialization.property("entity_type", DeleteAttachmentsRequestEntityType),
    entityId: core.serialization.property("entity_id", core.serialization.string()),
    containerId: core.serialization.property("container_id", core.serialization.string()),
});

export declare namespace DeleteAttachmentsRequest {
    export interface Raw {
        file_names: string[];
        entity_type: DeleteAttachmentsRequestEntityType.Raw;
        entity_id: string;
        container_id: string;
    }
}
