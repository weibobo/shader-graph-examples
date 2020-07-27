import { ShaderNode, ShaderSlotType, ShaderSlot } from "../../../base";

export default class MinimumNode extends ShaderNode {
    generateCode () {
        let a = this.getInputValue(0);
        let b = this.getInputValue(1);
        return `${this.getOutputVarName(0)} = min(${a}, ${b});`;
    }
}

