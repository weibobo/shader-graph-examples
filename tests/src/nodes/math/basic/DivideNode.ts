import { ShaderNode, ShaderSlotType, ShaderSlot } from "../../../base";

export default class DivideNode extends ShaderNode {
    generateCode () {
        return `${this.getOutputVarName(0)} = ${this.getInputValue(0)} / ${this.getInputValue(1)};`;
    }
}

