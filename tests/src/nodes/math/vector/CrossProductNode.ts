import { ShaderNode, ShaderSlotType, ShaderSlot } from "../../../base";

export default class CrossProductNode extends ShaderNode {
    generateCode () {
        let A = this.getInputValue(0);
        let B = this.getInputValue(1);
        return `${this.getOutputVarName(0)} = cross(${A}, ${B});`;
    }
}
