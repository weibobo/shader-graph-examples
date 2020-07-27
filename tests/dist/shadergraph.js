"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderGraph = void 0;
const base_1 = require("./base");
const utils_1 = require("./utils");
const nodes_1 = require("./nodes");
const MasterNode_1 = __importDefault(require("./nodes/master/MasterNode"));
class ShaderGraph {
    static decode(contentStr) {
        let content = utils_1.getJsonObject(contentStr);
        if (!content)
            return;
        base_1.resetGlobalShaderSlotID();
        let nodeMap = new Map;
        let properties = content.m_SerializedProperties.map(d => new base_1.ShaderPropery(d));
        let nodes = content.m_SerializableNodes.map(d => {
            let node = nodes_1.createNode(d);
            nodeMap.set(node.uuid, node);
            return node;
        });
        let edges = content.m_SerializableEdges.map(d => new base_1.ShaderEdge(d));
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let inputSlot = edge.input;
            let outputSlot = edge.output;
            let inputNode = nodeMap.get(inputSlot.nodeUuid);
            let outputNode = nodeMap.get(outputSlot.nodeUuid);
            if (!inputNode) {
                console.warn(`Can not find input [${inputSlot.nodeUuid}] for edge.`);
                continue;
            }
            if (!outputNode) {
                console.warn(`Can not find input [${outputSlot.nodeUuid}] for edge.`);
                continue;
            }
            inputNode.addDependency(outputNode);
            outputNode.setPriority(inputNode.priority + 1);
            let inputNodeSlot = inputNode.slotsMap.get(inputSlot.id);
            let outputNodeSlot = outputNode.slotsMap.get(outputSlot.id);
            if (inputNodeSlot) {
                inputNodeSlot.connectSlot = outputNodeSlot;
                inputNodeSlot.type = base_1.ShaderSlotType.Input;
            }
            if (outputNodeSlot) {
                outputNodeSlot.connectSlot = inputNodeSlot;
                outputNodeSlot.type = base_1.ShaderSlotType.Output;
            }
        }
        nodes.sort((a, b) => b.priority - a.priority);
        let masterNode = nodes.find(n => n instanceof MasterNode_1.default);
        if (!masterNode) {
            console.error('Can not find master node.');
            return;
        }
        // for (let i = 0; i < nodes.length; i++) {
        //     let node = nodes[i];
        //     let code = node.generateCode();
        // }
        let code = masterNode.generateCode();
        return code;
    }
}
exports.ShaderGraph = ShaderGraph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZGVyZ3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2hhZGVyZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQXdHO0FBQ3hHLG1DQUF3QztBQUN4QyxtQ0FBcUM7QUFDckMsMkVBQW1EO0FBR25ELE1BQWEsV0FBVztJQUNwQixNQUFNLENBQUMsTUFBTSxDQUFFLFVBQWtCO1FBQzdCLElBQUksT0FBTyxHQUFHLHFCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXJCLDhCQUF1QixFQUFFLENBQUM7UUFFMUIsSUFBSSxPQUFPLEdBQTRCLElBQUksR0FBRyxDQUFDO1FBRS9DLElBQUksVUFBVSxHQUFvQixPQUFPLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxvQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEcsSUFBSSxLQUFLLEdBQWlCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxJQUFJLEdBQUcsa0JBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLEtBQUssR0FBaUIsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksaUJBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRWpGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFN0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDWixPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixTQUFTLENBQUMsUUFBUSxhQUFhLENBQUMsQ0FBQTtnQkFDcEUsU0FBUzthQUNaO1lBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDYixPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixVQUFVLENBQUMsUUFBUSxhQUFhLENBQUMsQ0FBQTtnQkFDckUsU0FBUzthQUNaO1lBRUQsU0FBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFL0MsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU1RCxJQUFJLGFBQWEsRUFBRTtnQkFDZixhQUFhLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztnQkFDM0MsYUFBYSxDQUFDLElBQUksR0FBRyxxQkFBYyxDQUFDLEtBQUssQ0FBQzthQUM3QztZQUNELElBQUksY0FBYyxFQUFFO2dCQUNoQixjQUFjLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztnQkFDM0MsY0FBYyxDQUFDLElBQUksR0FBRyxxQkFBYyxDQUFDLE1BQU0sQ0FBQzthQUMvQztTQUNKO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksb0JBQVUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNWO1FBRUQsMkNBQTJDO1FBQzNDLDJCQUEyQjtRQUMzQixzQ0FBc0M7UUFDdEMsSUFBSTtRQUVKLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFsRUQsa0NBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hhZGVyUHJvcGVyeSwgU2hhZGVyTm9kZSwgU2hhZGVyRWRnZSwgcmVzZXRHbG9iYWxTaGFkZXJTbG90SUQsIFNoYWRlclNsb3RUeXBlIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBnZXRKc29uT2JqZWN0IH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlTm9kZSB9IGZyb20gXCIuL25vZGVzXCI7XHJcbmltcG9ydCBNYXN0ZXJOb2RlIGZyb20gXCIuL25vZGVzL21hc3Rlci9NYXN0ZXJOb2RlXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJHcmFwaCB7XHJcbiAgICBzdGF0aWMgZGVjb2RlIChjb250ZW50U3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IGdldEpzb25PYmplY3QoY29udGVudFN0cik7XHJcbiAgICAgICAgaWYgKCFjb250ZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIHJlc2V0R2xvYmFsU2hhZGVyU2xvdElEKCk7XHJcblxyXG4gICAgICAgIGxldCBub2RlTWFwOiBNYXA8c3RyaW5nLCBTaGFkZXJOb2RlPiA9IG5ldyBNYXA7XHJcblxyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzOiBTaGFkZXJQcm9wZXJ5W10gPSBjb250ZW50Lm1fU2VyaWFsaXplZFByb3BlcnRpZXMubWFwKGQgPT4gbmV3IFNoYWRlclByb3BlcnkoZCkpO1xyXG4gICAgICAgIGxldCBub2RlczogU2hhZGVyTm9kZVtdID0gY29udGVudC5tX1NlcmlhbGl6YWJsZU5vZGVzLm1hcChkID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjcmVhdGVOb2RlKGQpO1xyXG4gICAgICAgICAgICBub2RlTWFwLnNldChub2RlLnV1aWQsIG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZWRnZXM6IFNoYWRlckVkZ2VbXSA9IGNvbnRlbnQubV9TZXJpYWxpemFibGVFZGdlcy5tYXAoZCA9PiBuZXcgU2hhZGVyRWRnZShkKSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlZGdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZWRnZSA9IGVkZ2VzW2ldO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRTbG90ID0gZWRnZS5pbnB1dDtcclxuICAgICAgICAgICAgbGV0IG91dHB1dFNsb3QgPSBlZGdlLm91dHB1dDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnB1dE5vZGUgPSBub2RlTWFwLmdldChpbnB1dFNsb3Qubm9kZVV1aWQpO1xyXG4gICAgICAgICAgICBsZXQgb3V0cHV0Tm9kZSA9IG5vZGVNYXAuZ2V0KG91dHB1dFNsb3Qubm9kZVV1aWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbnB1dE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FuIG5vdCBmaW5kIGlucHV0IFske2lucHV0U2xvdC5ub2RlVXVpZH1dIGZvciBlZGdlLmApXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW91dHB1dE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FuIG5vdCBmaW5kIGlucHV0IFske291dHB1dFNsb3Qubm9kZVV1aWR9XSBmb3IgZWRnZS5gKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlucHV0Tm9kZS5hZGREZXBlbmRlbmN5KG91dHB1dE5vZGUpO1xyXG4gICAgICAgICAgICBvdXRwdXROb2RlLnNldFByaW9yaXR5KGlucHV0Tm9kZS5wcmlvcml0eSArIDEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0Tm9kZVNsb3QgPSBpbnB1dE5vZGUuc2xvdHNNYXAuZ2V0KGlucHV0U2xvdC5pZCk7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXROb2RlU2xvdCA9IG91dHB1dE5vZGUuc2xvdHNNYXAuZ2V0KG91dHB1dFNsb3QuaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0Tm9kZVNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0Tm9kZVNsb3QuY29ubmVjdFNsb3QgPSBvdXRwdXROb2RlU2xvdDtcclxuICAgICAgICAgICAgICAgIGlucHV0Tm9kZVNsb3QudHlwZSA9IFNoYWRlclNsb3RUeXBlLklucHV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvdXRwdXROb2RlU2xvdCkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0Tm9kZVNsb3QuY29ubmVjdFNsb3QgPSBpbnB1dE5vZGVTbG90O1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0Tm9kZVNsb3QudHlwZSA9IFNoYWRlclNsb3RUeXBlLk91dHB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZXMuc29ydCgoYSwgYikgPT4gYi5wcmlvcml0eSAtIGEucHJpb3JpdHkpO1xyXG5cclxuICAgICAgICBsZXQgbWFzdGVyTm9kZSA9IG5vZGVzLmZpbmQobiA9PiBuIGluc3RhbmNlb2YgTWFzdGVyTm9kZSk7XHJcbiAgICAgICAgaWYgKCFtYXN0ZXJOb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NhbiBub3QgZmluZCBtYXN0ZXIgbm9kZS4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgbm9kZSA9IG5vZGVzW2ldO1xyXG4gICAgICAgIC8vICAgICBsZXQgY29kZSA9IG5vZGUuZ2VuZXJhdGVDb2RlKCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBsZXQgY29kZSA9IG1hc3Rlck5vZGUuZ2VuZXJhdGVDb2RlKCk7XHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcbn1cclxuIl19